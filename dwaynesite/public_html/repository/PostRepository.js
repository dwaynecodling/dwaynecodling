"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MarkdownTool_1 = require("../internal_scripts/MarkdownTool");
var PostRepository;
(function (PostRepository) {
    let markdownTool = new MarkdownTool_1.MarkdownTool();
    const matter = require("gray-matter");
    const fs = require("fs");
    const path = require("path");
    async function getBySlug(slug) {
        let posts = await getAllPosts();
        for (const post of posts) {
            if (post.data.slug === slug) {
                return post;
            }
        }
        return null;
    }
    PostRepository.getBySlug = getBySlug;
    async function getAllPosts() {
        let dir = fs.readdirSync(path.resolve(__dirname, "../posts/"));
        let results = [];
        for (const filePath of dir) {
            if (filePath.endsWith(".md")) {
                results.push(await getPostFileContentStructure(filePath));
            }
        }
        return results;
    }
    PostRepository.getAllPosts = getAllPosts;
    async function getPostFileContentStructure(fileName) {
        let filePath = path.resolve(__dirname, "../posts/", fileName);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, { encoding: "utf8" });
            let structure = matter(content);
            return Object.assign(structure, {
                rawContent: structure.content,
                content: markdownTool.transform(structure.content)
            });
        }
    }
    PostRepository.getPostFileContentStructure = getPostFileContentStructure;
})(PostRepository = exports.PostRepository || (exports.PostRepository = {}));
//# sourceMappingURL=PostRepository.js.map