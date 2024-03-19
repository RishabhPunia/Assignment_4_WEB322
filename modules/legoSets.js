const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function Initialize() {
  return new Promise((resolve) => {
    sets = setData.map((set) => {
      const themeMatch = themeData.find((theme) => theme.id === set.theme_id);
      return {
        ...set,
        theme: themeMatch ? themeMatch.name : "Unknown Theme",
      };
    });
    resolve();
  });
}

function getAllSets() {
  return new Promise((resolve) => {
    resolve(sets);
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const foundSet = sets.find((set) => set.set_num === setNum);
    if (foundSet) {
      resolve(foundSet);
    } else {
      reject("Unable to find requested set");
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    const searchTerm = theme.toLowerCase();
    const filteredSets = sets.filter((set) =>
      set.theme.toLowerCase().includes(searchTerm)
    );
    if (filteredSets.length > 0) {
      resolve(filteredSets);
    } else {
      reject("Unable to find requested sets");
    }
  });
}

module.exports = {
  Initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
};
