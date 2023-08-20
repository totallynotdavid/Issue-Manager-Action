const axios = require('axios');
const yaml = require('js-yaml');
const { fetchTemplate } = require('../components/body');
const config = require('../config');

describe('fetchTemplate', () => {

    it('should fetch the template successfully from the correct raw URL', async () => {
        const response = await axios.get(config.rawIssueTemplateURL);
        const rawData = yaml.load(response.data);

        const fetchedData = await fetchTemplate();

        expect(rawData).toEqual(fetchedData);
    });
});
