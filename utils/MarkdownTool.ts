import * as MarkdownIt from "markdown-it/lib";

export class MarkdownTool {

    private mdLib = require("markdown-it");
    private md:MarkdownIt;
    private plugins = {
        emoji : require('markdown-it-emoji'),
        abbreviation : require('markdown-it-abbr'),
        modToken : require('markdown-it-modify-token'),
        checkbox : require('markdown-it-task-checkbox')
    };

    constructor() {
        this.md = this.mdLib({
            html:         true,        // Enable HTML tags in source
            xhtmlOut:     true,        // Use '/' to close single tags (<br />).
            breaks:       true,        // Convert '\n' in paragraphs into <br>
            langPrefix:   'lang-',  // CSS language prefix for fenced blocks. Useful for external highlighters.
            linkify:      true,        // Auto-convert URL-like text to links

            // Enable some language-neutral replacement + quotes beautification
            typographer:  true,
            quotes: '“”‘’',

            // Highlighter function. Should return escaped HTML,
            // or '' if the source string is not changed and should be escaped externally.
            // If result starts with <pre... internal wrapper is skipped.
            highlight: function (/*str, lang*/) { return ''; },

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
                        if (token.tag === "h3") token.attrObj.class = "post-template__header";
                        break;
                    case 'paragraph_open':
                        if (token.tag === "p") token.attrObj.class = "post-template__text";
                        break;
                    case 'inline':
                        if (token.tag === "" && token.level === 2){
                            if (token.children.length > 0 && token.children[0].type === "text"){
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
    }

    transform(input:string){
        return this.md.render(input);
    }

}