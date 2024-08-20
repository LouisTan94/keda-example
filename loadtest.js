import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,              // Number of Virtual Users
  duration: '30s',     // Duration of the test
};

export default function () {
  let res = http.get('http://nginx-metrics.default.svc.cluster.local:9113/metrics');
  console.log(`Status: ${res.status}`);
  sleep(1);             // Wait for 1 second between requests
}