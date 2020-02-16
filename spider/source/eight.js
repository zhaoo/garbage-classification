const superagent = require('superagent')
const cheerio = require('cheerio')

class Eight {
  constructor() {
    this.url = {
      other: 'https://www.8684.cn/ljfl_glj',
      food: 'https://www.8684.cn/ljfl_slj',
      harmful: 'https://www.8684.cn/ljfl_yhlj',
      recyclable: 'https://www.8684.cn/ljfl_khslj'
    }
  }

  parse = (body) => {
    const $ = cheerio.load(body.text)
    let arr = []
    $('.list-col4 li a').each((index, ele) => {
      arr.push($(ele).text())
    })
    return arr
  }

  run = async () => {
    const { url, parse } = this
    let data = []
    for (const i in url) {
      const res = await superagent.get(url[i])
      data.push({
        key: i,
        value: parse(res)
      })
    }
    return data
  }
}

exports.Eight = Eight