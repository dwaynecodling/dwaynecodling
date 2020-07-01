import {MarkdownTool} from "../internal_scripts/MarkdownTool";
import {dateParse, getReadTime} from "../internal_scripts/convinienceHelper";
import {raw} from "express";

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
            published?: boolean;
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
                    let postEntry = await getPostFileContentStructure(filePath);
                    if (postEntry && postEntry.data.published !== false) results.push(postEntry);
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
        if (readCache[`post_content_structure_${fileName}`]){
            return readCache[`post_content_structure_${fileName}`];
        }

        let filePath = path.resolve(__dirname,"../views/posts/", fileName);
        if (fs.existsSync( filePath )){

            let content = fs.readFileSync(filePath, { encoding : "utf8" });
            let structure = matter(content);

            let transformedContent = markdownTool.transform(structure.content);

            structure = Object.assign(structure, {
                rawContent: structure.content,
                content: transformedContent
            });

            let rawTitle = structure.data.title;
            let cleanedTitle = rawTitle?.replace(/<[^>]+>/gm, '').replace(/([\r\n]+ +)+/gm, '');

            structure.data = Object.assign(structure.data, {
                readTime: getReadTime(transformedContent, {
                    secondPlural: "SECS",
                    secondSingular: "SEC",
                    minutePlural: "MINS",
                    minuteSingular: "MIN"
                }),
                titleText: cleanedTitle,
                title: rawTitle
            });

            readCache[`post_content_structure_${fileName}`] = structure;

            if (structure && structure.data.published !== false) return structure
            else return null;
        }
        return null;
    }
}