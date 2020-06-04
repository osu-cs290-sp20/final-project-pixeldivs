(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newDrawing'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"drawings\">\n    <div class=\"preview square\">   \n    </div>\n    <label class=\"title-drawings\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":4,"column":35},"end":{"line":4,"column":44}}}) : helper)))
    + " </label>\n    <div class='hidden-elements' hidden>\n        <label class='width' >"
    + alias4(((helper = (helper = lookupProperty(helpers,"width") || (depth0 != null ? lookupProperty(depth0,"width") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data,"loc":{"start":{"line":6,"column":30},"end":{"line":6,"column":39}}}) : helper)))
    + "</label>\n        <label class='height' >"
    + alias4(((helper = (helper = lookupProperty(helpers,"height") || (depth0 != null ? lookupProperty(depth0,"height") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data,"loc":{"start":{"line":7,"column":31},"end":{"line":7,"column":41}}}) : helper)))
    + "</label>\n        <label class='pixels'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"pixels") || (depth0 != null ? lookupProperty(depth0,"pixels") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pixels","hash":{},"data":data,"loc":{"start":{"line":8,"column":30},"end":{"line":8,"column":40}}}) : helper)))
    + "</label>\n    </div>\n</div>\n";
},"useData":true});
})();