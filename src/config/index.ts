const Level = {
  low: 0,
  middle: 1,
  high: 2
}

const Methods = {
  get: "get",
  post: "post",
};

const ResourceLibraryLists = [
  {
    name: "modb",
    link:
      "https://www.modb.pro/api/code/getSmsCode?areaCode=86&action=register&phoneNum=",
    method: Methods.get,
    params: {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json;charset=utf-8",
        pragma: "no-cache",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        Referer: "https://www.modb.pro/register?redirect=%2Fsearch",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      }
    },
  },
];

export {
  Methods,
  ResourceLibraryLists,
  Level,
}