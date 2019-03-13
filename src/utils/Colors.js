export const ColorsBase = {
  optimal: "#10ac84",
  optimal_1: "#1dd1a1",
  minimal: "#ff9f43",
  minimal_1: "#ee5253"
};

export const COLOR_RANGE_CLOUD_DENSITY = [ColorsBase.minimal_1, 
  ColorsBase.minimal, 
  ColorsBase.optimal_1, 
  ColorsBase.optimal, 
  ColorsBase.optimal_1, 
  ColorsBase.minimal, 
  ColorsBase.minimal_1];

export const COLOR_RANGE = [ColorsBase.minimal_1, 
  ColorsBase.minimal, 
  ColorsBase.optimal_1, 
  ColorsBase.optimal];

export const COLOR_RANGE_INVERT = [ColorsBase.optimal, 
  ColorsBase.optimal_1, 
  ColorsBase.minimal, 
  ColorsBase.minimal_1];

export const colorInterval = function(n, min, max, color_range) {
  var minMaxRange = max - min;
  var range = minMaxRange/color_range.length;
  var index = Math.floor(n/range);
  if (index == color_range.length)
    index--;
  return color_range[index];
}