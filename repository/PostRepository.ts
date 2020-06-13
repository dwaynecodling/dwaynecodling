import {MarkdownTool} from "../internal_scripts/MarkdownTool";

export namespace PostRepository{

    let markdownTool = new MarkdownTool();
    const matter = require("gray-matter");
    const fs = require("fs");
    const path = require("path");

    export interface IPostEntry {
        content: string;
        rawContent: string;
        data: {
            title : string;
            slug: string;
            hero: string;
            alt: string;
            datePublished?: Date;
        }
    }

    export async function getBySlug(slug): Promise<PostRepository.IPostEntry | null> {
        let posts = await getAllPosts();

        for (const post of posts) {
            if (post.data.slug === slug){
                return post;
            }
        }
        return null;
    }

    export async function getAllPosts(): Promise<IPostEntry[]> {
        let dir = fs.readdirSync(path.resolve(__dirname,"../views/posts/"));
        let results = [];

        for (const filePath of dir) {
            if (filePath.endsWith(".md")) {
                results.push(await getPostFileContentStructure(filePath));
            }
        }

        return results;
    }

    export async function getPostFileContentStructure(fileName:string):Promise<IPostEntry>{
        let filePath = path.resolve(__dirname,"../views/posts/", fileName);
        if (fs.existsSync( filePath )){
            let content = fs.readFileSync(filePath, { encoding : "utf8" });
            let structure = matter(content);

            return Object.assign(structure, {
                rawContent: structure.content,
                content: markdownTool.transform(structure.content)
            });
        }
    }

}