import {MarkdownTool} from "../internal_scripts/MarkdownTool";
import {dateParse, getReadTime} from "../internal_scripts/convinienceHelper";

export namespace PostRepository{

    let markdownTool = new MarkdownTool();
    const matter = require("gray-matter");
    const fs = require("fs");
    const path = require("path");
    let readCache:{[cacheKey:string]:any} = {};

    setInterval(()=>{
        if (Object.keys(readCache).length > 0) console.log("Clearing readCache");
        readCache = {};
    }, 3_000).unref();

    export interface IPostEntry {
        content: string;
        rawContent: string;
        data: {
            title : string;
            slug: string;
            hero: string;
            alt: string;
            date?: string;
            readTime?: string;
        }
    }

    export async function getBySlug(slug): Promise<PostRepository.IPostEntry | null> {
        let posts = await getAllPosts(true);

        for (const post of posts) {
            if (post.data.slug === slug){
                return post;
            }
        }
        return null;
    }

    export async function getAllPosts(sortByDate?:boolean): Promise<IPostEntry[]> {
        let dir = readCache['allPostsInDir'] ?? fs.readdirSync(path.resolve(__dirname,"../views/posts/"));
        readCache['allPostsInDir'] = dir;
        let results:Array<IPostEntry> = readCache['allPostsStructures'] ?? [];

        if (results.length === 0){
            for (const filePath of dir) {
                if (filePath.endsWith(".md")) {
                    results.push(await getPostFileContentStructure(filePath));
                }
            }
        }

        readCache['allPostsStructures'] = results;

        if (sortByDate === true){
            results = results.sort(function(a, b) {
                let dateA = dateParse(a.data.date, "DD MMMM YYYY", true);
                let dateB = dateParse(b.data.date, "DD MMMM YYYY", true);
                return dateB.getTime() - dateA.getTime();
            });
        }

        return results;
    }

    export async function getRecentPosts(count:number=3){
        return (await getAllPosts(true)).slice(0, count);
    }

    export async function getAllFilteredPosts(filterFunction:(p:IPostEntry)=>boolean, sortByDate:boolean=false){
        let posts = await getAllPosts(sortByDate);
        return posts.filter(filterFunction);
    }

    export async function getPostFileContentStructure(fileName:string):Promise<IPostEntry>{
        let filePath = path.resolve(__dirname,"../views/posts/", fileName);
        if (fs.existsSync( filePath )){

            if (readCache[`postStructure_${fileName}`]){
                return readCache[`postStructure_${fileName}`];
            }

            let content = fs.readFileSync(filePath, { encoding : "utf8" });
            let structure = matter(content);

            let transformedContent = markdownTool.transform(structure.content);

            structure = Object.assign(structure, {
                rawContent: structure.content,
                content: transformedContent
            });

            structure.data = Object.assign(structure.data, {
                readTime: getReadTime(transformedContent, {
                    secondPlural: "SECS",
                    secondSingular: "SEC",
                    minutePlural: "MINS",
                    minuteSingular: "MIN"
                }),
                titleHTML: structure.data.title,
                title: structure.data.title?.replace(/<[^>]+>/gm, '').replace(/([\r\n]+ +)+/gm, '')
            });

            readCache[`postStructure_${fileName}`] = structure;

            return structure;
        }
    }
}