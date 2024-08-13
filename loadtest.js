import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,  // Number of virtual users
  duration: '30s',  // Test duration
};

export default function () {
  http.get('http://web-app-service');  // Replace with your service URL
  sleep(1);
}