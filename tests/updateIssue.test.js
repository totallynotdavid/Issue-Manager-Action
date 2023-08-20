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

    test.each(testCases)('el issue debería de seguir el formato de la plantilla', async ({ mockIssue, expectedBody }) => {
        await updateIssue(mockIssue, { issues });
        expect(issues.update).toHaveBeenCalledWith(expect.objectContaining({
            body: expectedBody
        }));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('no se debería de intentar actualizar el issue si no hubo cambios', async () => {
        const mockIssueThatFollowsTemplate = {
            body: mockPerfectIssue[0],
        };

        const newBody = await updateIssue(mockIssueThatFollowsTemplate, { issues });

        expect(mockIssueThatFollowsTemplate.body.trim()).toEqual(newBody);
        expect(issues.update).not.toHaveBeenCalled();
    });

});
