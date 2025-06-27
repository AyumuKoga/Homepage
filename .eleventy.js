module.exports = function(eleventyConfig) {
  // 静的ファイルのコピー
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");

  // パーシャルテンプレートの設定
  eleventyConfig.addPassthroughCopy("src/_includes");

  // フィルターの追加
  eleventyConfig.addFilter("activeClass", function(url, currentUrl) {
    return url === currentUrl ? 'active' : '';
  });

  // ショートコードの追加
  eleventyConfig.addShortcode("currentYear", function() {
    return new Date().getFullYear();
  });

  // リンク用のフィルター - 相対パスを確実に処理
  eleventyConfig.addFilter("relativeUrl", function(url) {
    if (url === '/') return './';
    if (url.startsWith('/')) {
      return '.' + url;
    }
    return url;
  });

  // グローバルデータにベースURLを追加
  eleventyConfig.addGlobalData("baseUrl", '');

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  }
};
