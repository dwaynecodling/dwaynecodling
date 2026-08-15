"use strict";
exports.__esModule = true;
exports.MarkdownTool = void 0;
var MarkdownTool = /** @class */ (function () {
    function MarkdownTool() {
        this.mdLib = require("markdown-it");
        this.plugins = {
            emoji: require('markdown-it-emoji').full,
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
            // Enable some language-neutral replacement + quotes beautification
            typographer: true,
            quotes: '“”‘’',
            // Highlighter function. Should return escaped HTML,
            // or '' if the source string is not changed and should be escaped externally.
            // If result starts with <pre... internal wrapper is skipped.
            highlight: function ( /*str, lang*/) { return ''; },
            modifyToken: function (token, env) {
                switch (token.type) {
                    case 'image':
                        token.attrObj.loading = 'lazy';
                        break;
                    case 'link_open':
                        token.attrObj.target = '_blank';
                        token.attrObj.rel = 'noopener';
                        token.attrObj["class"] = 'l';
                        token.attrObj.hreflang = 'en';
                        break;
                    case 'bullet_list_open':
                        token.attrObj["class"] = 'para';
                        break;
                    case 'heading_open':
                        if (token.tag === "h3")
                            token.attrObj["class"] = "post-template__header";
                        break;
                    case 'paragraph_open':
                        if (token.tag === "p")
                            token.attrObj["class"] = "post-template__text";
                        break;
                    case 'inline':
                        if (token.tag === "" && token.level === 2) {
                            if (token.children.length > 0 && token.children[0].type === "text") {
                                token.tag = "blockquote";
                            }
                        }
                        break;
                    default:
                        //console.log(token);
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
        this.md.renderer.rules.image = function (tokens, idx, options, env, self) {
            var token = tokens[idx];
            var src = token.attrGet('src') || '';
            var alt = token.attrGet('alt') || '';
            var webpSrc = src.replace(/(\.(?:jpe?g|png))$/i, '.webp');
            var mobileWebpSrc = src.replace(/(\.(?:jpe?g|png))$/i, '@720w.webp');
            var mobileSrc = src.replace(/(\.(?:jpe?g|png|gif|webp))$/i, '@720w$1');
            return "<picture><source type=\"image/webp\" srcset=\"" + mobileWebpSrc + " 720w, " + webpSrc + " 1440w\" sizes=\"(max-width: 62em) 100vw, 800px\"><img src=\"" + src + "\" srcset=\"" + mobileSrc + " 720w, " + src + " 1440w\" sizes=\"(max-width: 62em) 100vw, 800px\" alt=\"" + alt + "\" loading=\"lazy\"></picture>";
        };
    }
    MarkdownTool.prototype.transform = function (input) {
        return this.md.render(input);
    };
    return MarkdownTool;
}());
exports.MarkdownTool = MarkdownTool;
