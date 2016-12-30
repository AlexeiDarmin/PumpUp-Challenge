const body = {
  '_version': '4.7.0',
  '_SessionToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g' // eslint-disable-line max-len
}

const payloads = {
  userPhotosFeed: {
    'isThumbnailsOnly': true,
    'limit': 5,
    'userId': 2707798,
    '_method': 'POST'
  },
  popularPhotosFeed: {
    'isThumbnailsOnly': true,
    'limit': 18,
    '_method': 'POST'
  },
  userProfile: {
    '_method': 'GET'
  }
}

export const requests = {
  userPhotosFeed:  ['http://api.pumpup.com/1/functions/feed/profile/load-batch', {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(Object.assign(body, payloads.userPhotosFeed))}],
  popularPhotosFeed: ['http://api.pumpup.com/1/functions/feed/popular/load-batch', {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(Object.assign(body, payloads.popularPhotosFeed))}],
  loadUserProfile: ['http://api.pumpup.com/1/classes/User/318381', {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(Object.assign(body, payloads.userProfile))}]
}
