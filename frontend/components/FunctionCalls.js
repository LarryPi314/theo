const baseURL = "http://localhost:5001/rals-treehacks-25-57224/us-central1"

export async function createUser(user) {
  console.log(baseURL+"/usersApi/createUser")

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(user),
    redirect: 'follow'
  }

  let res =  await fetch(baseURL+"/usersApi/createUser", requestOptions)

  return res
}

export async function getUser(uid) {
  console.log(baseURL + "/usersApi/getUser")

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",  // Changed from "POST" to "GET"
    headers: myHeaders,
    redirect: 'follow'
  }

  // Append the `uid` as a query parameter
  let res = await fetch(baseURL + `/usersApi/getUser?uid=${encodeURIComponent(uid)}`, requestOptions)

  return res.json();
}

export async function getJourneys(uid) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({user: uid}),
    redirect: 'follow'
  }

  let res =  await fetch(baseURL+"/journalsApi/getJournalsByUser", requestOptions)

  return res.json()
}

export async function getJournal(journalId) {
  console.log(baseURL+"/journalsApi/getJournalById?journal="+journalId)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: 'follow'
  }

  let res = await fetch(baseURL+"/journalsApi/getJournalById?journal="+journalId, requestOptions)

  return res.json()
}

export async function getCarousel(uid) {
  console.log(baseURL+"/usersApi/getUsersCarousel?user="+uid)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: 'follow'
  }
  console.log('getting carousel')
  let res = await fetch(baseURL+"/usersApi/getUsersCarousel?user="+uid, requestOptions)
  return res.json()
}

export async function createJournal(uid, text) {
  console.log(baseURL+"/journalsApi/createJournal")

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({user: uid, text: text}),
    redirect: 'follow'
  }

  const res = await fetch(baseURL+"/journalsApi/createJournal", requestOptions)
  return res
}