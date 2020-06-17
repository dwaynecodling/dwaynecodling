"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const MarkdownTool_1 = require("../internal_scripts/MarkdownTool");
const convinienceHelper_1 = require("../internal_scripts/convinienceHelper");
var PostRepository;
(function (PostRepository) {
    let markdownTool = new MarkdownTool_1.MarkdownTool();
    const matter = require("gray-matter");
    const fs = require("fs");
    const path = require("path");
    const readCache = {};
    async function getBySlug(slug) {
        let posts = await getAllPosts(true);
        for (const post of posts) {
            if (post.data.slug === slug) {
                return post;
            }
        }
        return null;
    }
    PostRepository.getBySlug = getBySlug;
    async function getAllPosts(sortByDate) {
        var _a, _b;
        let dir = (_a = readCache['allPostsInDir']) !== null && _a !== void 0 ? _a : fs.readdirSync(path.resolve(__dirname, "../views/posts/"));
        readCache['allPostsInDir'] = dir;
        let results = (_b = readCache['allPostsStructures']) !== null && _b !== void 0 ? _b : [];
        if (results.length === 0) {
            for (const filePath of dir) {
                if (filePath.endsWith(".md")) {
                    results.push(await getPostFileContentStructure(filePath));
                }
            }
        }
        readCache['allPostsStructures'] = results;
        if (sortByDate === true) {
            results = results.sort(function (a, b) {
                let dateA = convinienceHelper_1.dateParse(a.data.date, "DD MMMM YYYY", true);
                let dateB = convinienceHelper_1.dateParse(b.data.date, "DD MMMM YYYY", true);
                return dateB.getTime() - dateA.getTime();
            });
        }
        return results;
    }
    PostRepository.getAllPosts = getAllPosts;
    async function getRecentPosts(count = 3) {
        return (await getAllPosts(true)).slice(0, count);
    }
    PostRepository.getRecentPosts = getRecentPosts;
    async function getAllFilteredPosts(filterFunction, sortByDate = false) {
        let posts = await getAllPosts(sortByDate);
        return posts.filter(filterFunction);
    }
    PostRepository.getAllFilteredPosts = getAllFilteredPosts;
    async function getPostFileContentStructure(fileName) {
        var _a;
        let filePath = path.resolve(__dirname, "../views/posts/", fileName);
        if (fs.existsSync(filePath)) {
            if (readCache[`postStructure_${fileName}`]) {
                return readCache[`postStructure_${fileName}`];
            }
            let content = fs.readFileSync(filePath, { encoding: "utf8" });
            let structure = matter(content);
            let transformedContent = markdownTool.transform(structure.content);
            structure = Object.assign(structure, {
                rawContent: structure.content,
                content: transformedContent
            });
            structure.data = Object.assign(structure.data, {
                readTime: convinienceHelper_1.getReadTime(transformedContent, {
                    secondPlural: "SECS",
                    secondSingular: "SEC",
                    minutePlural: "MINS",
                    minuteSingular: "MIN"
                }),
                titleHTML: structure.data.title,
                title: (_a = structure.data.title) === null || _a === void 0 ? void 0 : _a.replace(/<[^>]+>/gm, '').replace(/([\r\n]+ +)+/gm, '')
            });
            readCache[`postStructure_${fileName}`] = structure;
            return structure;
        }
    }
    PostRepository.getPostFileContentStructure = getPostFileContentStructure;
})(PostRepository = exports.PostRepository || (exports.PostRepository = {}));
//# sourceMappingURL=PostRepository.js.map