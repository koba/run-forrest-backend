import axios from 'axios';

class RunForrest {

    apiUrl = 'http://agurz.ddns.net:9000';
    sessionToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZTFkNTFhMjFkYTJiMThiNDVkNzQzNCIsImlhdCI6MTUyNDc0OTgwN30.qdcJgVG1MN95ol_d6PIem2KbJLOuw2P6la5yglxwdec';

    getRuns() {
        return axios.get(`${this.apiUrl}/runs?access_token=${this.sessionToken}`);
    }

    getRunState(runId) {
        return axios.get(`${this.apiUrl}/runs/${runId}/state?access_token=${this.sessionToken}`);
    }

}

export default new RunForrest();