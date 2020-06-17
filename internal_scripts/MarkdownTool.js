"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownTool = void 0;
class MarkdownTool {
    constructor() {
        this.mdLib = require("markdown-it");
        this.plugins = {
            emoji: require('markdown-it-emoji'),
            abbreviation: require('markdown-it-abbr'),
            modToken: require('markdown-it-modify-token'),
            checkbox: require('markdown-it-task-checkbox')
        };
        this.md = this.mdLib({
            html: true,
            xhtmlOut: true,
            breaks: true,
            langPrefix: 'lang-',
            linkify: true,
            typographer: true,
            quotes: '“”‘’',
            highlight: function () { return ''; },
            modifyToken: function (token, env) {
                switch (token.type) {
                    case 'image':
                        token.attrObj.loading = 'lazy';
                        break;
                    case 'link_open':
                        token.attrObj.target = '_blank';
                        token.attrObj.rel = 'noopener';
                        token.attrObj.class = 'l';
                        token.attrObj.hreflang = 'en';
                        break;
                    case 'bullet_list_open':
                        token.attrObj.class = 'para';
                        break;
                    case 'heading_open':
                        if (token.tag === "h3")
                            token.attrObj.class = "post-template__header";
                        break;
                    case 'paragraph_open':
                        if (token.tag === "p")
                            token.attrObj.class = "post-template__text";
                        break;
                    case 'inline':
                        if (token.tag === "" && token.level === 2) {
                            if (token.children.length > 0 && token.children[0].type === "text") {
                                token.tag = "blockquote";
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        });
        this.md.use(this.plugins.emoji);
        this.md.use(this.plugins.abbreviation);
        this.md.use(this.plugins.checkbox, {
            disabled: true,
            divWrap: false,
            divClass: 'md-checkbox',
            ulClass: 'md-task-list',
            liClass: 'md-task-list-item'
        });
        this.md.use(this.plugins.modToken);
    }
    transform(input) {
        return this.md.render(input);
    }
}
exports.MarkdownTool = MarkdownTool;
//# sourceMappingURL=MarkdownTool.js.map