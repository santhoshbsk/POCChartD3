// IE11 fix
// Ref: https://github.com/swimlane/ana-charts/issues/386
if (typeof(SVGElement) !== 'undefined' && typeof SVGElement.prototype.contains === 'undefined') {
  SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
}
