const { updateIssue } = require('../components/body');
const { issues } = require('octokit');
const mockIssues = require('../test-data/mockIssues');
const expectedBodies = require('../test-data/expectedBodies.js');

jest.mock('axios');
jest.mock('octokit');

describe('updateIssue', () => {
    const testCases = mockIssues.map((issue, index) => ({
        mockIssue: issue,
        expectedBody: expectedBodies[index]
    }));

    test.each(testCases)('should correctly format the issue according to the template', async ({ mockIssue, expectedBody }) => {
        await updateIssue(mockIssue, { issues });
        expect(issues.update).toHaveBeenCalledWith(expect.objectContaining({
            body: expectedBody
        }));
    });
});
