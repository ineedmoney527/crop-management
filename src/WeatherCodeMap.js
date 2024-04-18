export const ICON_MAP = new Map();
addMapping(["0-day", "1-day"], "sun");
addMapping(["2-day"], "cloud-sun");
addMapping(["0-night", "1-night"], "moon");
addMapping(["2-night"], "cloud-moon");
addMapping([3], "cloud");
addMapping([45, 48], "smog");
addMapping(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  "cloud-showers-heavy"
);
addMapping([71, 73, 75, 77, 85, 86], "snowflake");
addMapping([95, 96, 99], "cloud-bolt");
function addMapping(values, icon) {
  values.forEach((value) => {
    ICON_MAP.set(value, icon);
  });
}

export const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle: Light intensity",
  53: "Drizzle: Moderate intensity",
  55: "Drizzle: Dense intensity",
  56: "Freezing Drizzle: Light intensity",
  57: "Freezing Drizzle: Dense intensity",
  61: "Rain: Slight intensity",
  63: "Rain: Moderate intensity",
  65: "Rain: Heavy intensity",
  66: "Freezing Rain: Light intensity",
  67: "Freezing Rain: Heavy intensity",
  71: "Snow fall: Slight intensity",
  73: "Snow fall: Moderate intensity",
  75: "Snow fall: Heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight intensity",
  81: "Rain showers: Moderate intensity",
  82: "Rain showers: Violent intensity",
  85: "Snow showers: Slight intensity",
  86: "Snow showers: Heavy intensity",
  95: "Thunderstorm: Slight intensity",
  96: "Thunderstorm with hail: Slight intensity",
  99: "Thunderstorm with hail: Heavy intensity",
};
