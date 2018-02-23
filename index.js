import fetch from 'unfetch'

export class Server {
  contructor(url) {
    this.url = url
    this.fetch(url)
  }
  getDefaultPrinter = () => {
    fetch(`${this.url}/default?type=printer`)
      .then(res => {
        if (res.status >= 200 && res.status < 300) return res.json()
        else return Promise.reject(res.status)
      })
      .then(defaultPrinter => new ZebraPrinter(this.url, defaultPrinter))
  }
  getAllPrinters = () => {
    fetch(`${this.url}/available`)
      .then(res => {
        if (res.status >= 200 && res.status < 300) return res.json()
        else return Promise.reject(res.status)
      })
      .then(available =>
        available.printer.map(p => new ZebraPrinter(this.url, p))
      )
  }
}

export class Printer {
  constructor(url, device) {
    this.url = url
    this.name = device.name
    this.uid = device.uid
    this.device = device
  }

  // method to POST commands to the printer
  post = (url, body) =>
    fetch(`${this.url}${url}`, {
      method: 'POST',
      body: JSON.stringify(body)
    }).then(res => {
      if (res.status >= 200 && res.status < 300) return res.json()
      else return Promise.reject(res.status)
    })
  // read command
  read = () => this.post('/read', {device: this.device})
  // write command
  write = data => this.post('/write', {device: this.device, data: data})

  //prints zpl code to the printer
  print = zpl => this.write(zpl)
}
