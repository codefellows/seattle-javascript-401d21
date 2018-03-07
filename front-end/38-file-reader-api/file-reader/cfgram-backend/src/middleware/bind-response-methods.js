export default (req, res, next) => {
  res.send = res.send.bind(res)
  res.json = res.json.bind(res)
  res.status = res.status.bind(res)
  res.sendFile = res.sendFile.bind(res)
  res.sendStatus = res.sendStatus.bind(res)
  res.page = (data) => {
    res.links({
      next: data.next,
      prev: data.prev,
      last: data.last,
    })
    res.json(data)
  }
  next()
}
