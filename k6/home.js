import http from 'k6/http'
import { sleep } from 'k6'

const url = `http://localhost:3000/`

export const options = {
    vus: 10,
    iterations: 200,
}

// export function setup() {
//     // console.log('Setup')
// }

export default function () {
    http.get(url)
    sleep(0.05)
}

// export function teardown() {
//     // console.log('Teardown')
// }
