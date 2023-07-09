import { JSDOM } from "jsdom";

const getData = async () => {
  const res = await fetch("https://www.filmweb.pl/ranking/vod/film/netflix");
  const data = await res.text();
  const parser = new JSDOM(data, {
    includeNodeLocations: true,
    resources: "usable",
    contentType: "text/html",
  });

  const allNodesH2 = parser.window.document.querySelectorAll(
    ".rankingType__title"
  );
  let arr = [];
  for (let i = 0; i < allNodesH2.length; i++) {
    const obj = allNodesH2[i].textContent;
    arr.push(obj);
  }

  const allNodesRating = parser.window.document.querySelectorAll(
    ".rankingType__rate--value"
  );
  let arrRank = [];
  for (let i = 0; i < allNodesRating.length; i++) {
    const obj = allNodesRating[i].textContent;
    arrRank.push(obj);
  }

  let combined = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = { Title: arr[i], Rank: arrRank[i] };
    combined.push(obj);
  }
  console.log(combined);
};

getData();
