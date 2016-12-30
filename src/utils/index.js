import React from 'react'


/**
 * Adds DOM hyperlink elements to tags and mentions ('#', '@') within text.
 * @param  {String} text
 * @return {Object} DOM siblings with linkified tags and mentions.
 */
export const addLinks = (text) => {

  if (typeof text !== 'string' || text === '') { return '' }

  const linkify = (mention, i) => <a href={mention} key={i}>{mention}</a>

  let DOMSiblings     = []
  let linkStartIndex  = -1
  let baseIndex       = 0

  for (let i = 0, len = text.length - 1; i < len; ++i){
    let c = text[i]


    if ((c === '#' || c === '@') && text[i + 1] !== ' ') {
      // Tag or mention has started so save string from base to current index
      if (linkStartIndex === -1) {
        DOMSiblings.push(text.slice(baseIndex, i))
      } else {
        DOMSiblings.push(linkify(text.slice(baseIndex, i)))
      }

      baseIndex       = i
      linkStartIndex  = i

    } else if (linkStartIndex !== -1 && (c === ' ' || c === '\n')){
      // A tag or mention has ended, add link and update base index.
      DOMSiblings.push(linkify(text.slice(linkStartIndex, i), i))

      linkStartIndex  = -1
      baseIndex       = i
    }
  }

  if (linkStartIndex === -1) {
    DOMSiblings.push(text.slice(baseIndex, text.length))
  } else {
    DOMSiblings.push(linkify(text.slice(baseIndex, text.length)))
  }

  return DOMSiblings
}





/*
 * Sends the given request and handles errors if the response status is not ok.
 *
 * @param {Object} req, object that satisfies the native fetch()
 *
 * @example input
 *   handleRequest([
 *     'http://api.url.com/v1', {
 *        headers: {'Content-Type': 'application/json'},
 *        method: 'POST',
 *        body: JSON.stringify({foo: 'bar'})
 *      }
 *    ])
 *
 * @return {Promise} Promise containing the result of the request
 */
export const handleRequest = (req) => {

  return fetch(...req)
  .then((res) => {

    if (!res.ok) { throw Error(res.statusText) }

    return res

  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
}
