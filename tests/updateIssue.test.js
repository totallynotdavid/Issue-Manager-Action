const { updateIssue } = require('../components/body');
const { issues } = require('octokit');
const mockIssues = require('../test-data/mockIssues');
const expectedBodies = require('../test-data/expectedBodies.js');
const mockPerfectIssue = require('../test-data/mockPerfectIssue.js');

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

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should not attempt to update issues that already follow the template', async () => {
        const mockIssueThatFollowsTemplate = {
            body: mockPerfectIssue[0],
        };

        const newBody = await updateIssue(mockIssueThatFollowsTemplate, { issues });

        if (mockIssueThatFollowsTemplate.body.trim() !== newBody) {
            console.log('This issue does not follow the template, although it shouldn\'t be updated');
        } else {
            console.log('This issue follows the template, so it shouldn\'t be updated');
        }

        expect(issues.update).not.toHaveBeenCalled();
    });

});
