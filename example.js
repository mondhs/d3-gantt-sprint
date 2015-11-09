


var tasks = 
[
    {
        "subtask": "P1S1",
        "parent": "P1",
        "developer": "Kermit",
        "parentSummary": "Parent Description 1",
        "substaskSummary": "Subtask Name 1.1",
        "parentCommitment": "2025-10-29T22:00:00.000Z",
        "subtaskCommitment": "2025-10-28T22:00:00.000Z",
        "parentDaysTillCommitment": 2,
        "subtaskDaysTillCommitment": 1,
        "subtaskHoursLeft": 5,
        "parentHoursLeft": 11,
        "parentSpentSec": 133200,
        "parentEstimateSec": 172800,
        "subtaskSpentSec": 25200,
        "subtaskEstimateSec": 43200
    },
    {
        "subtask": "P1S2",
        "parent": "P1",
        "developer": "Statler",
        "parentSummary": "Parent Description 1",
        "substaskSummary": "Subtask Name 1.2",
        "parentCommitment": "2025-10-29T22:00:00.000Z",
        "subtaskCommitment": "2025-10-28T22:00:00.000Z",
        "parentDaysTillCommitment": 2,
        "subtaskDaysTillCommitment": 1,
        "subtaskHoursLeft": 1,
        "parentHoursLeft": 11,
        "parentSpentSec": 133200,
        "parentEstimateSec": 172800,
        "subtaskSpentSec": 82800,
        "subtaskEstimateSec": 86400
    },
    {
        "subtask": "P1S3",
        "parent": "P1",
        "developer": "Waldorf",
        "parentSummary": "Parent Description 1",
        "substaskSummary": "Subtask Name 1.3",
        "parentCommitment": "2025-10-29T22:00:00.000Z",
        "subtaskCommitment": "2025-10-29T22:00:00.000Z",
        "parentDaysTillCommitment": 2,
        "subtaskDaysTillCommitment": 2,
        "subtaskHoursLeft": 5,
        "parentHoursLeft": 11,
        "parentSpentSec": 133200,
        "parentEstimateSec": 172800,
        "subtaskSpentSec": 25200,
        "subtaskEstimateSec": 43200
    },
    {
        "subtask": "P2S1",
        "parent": "P2",
        "developer": "Fozzie",
        "parentSummary": "Parent Description 2",
        "substaskSummary": "Subtask Name 2.1",
        "parentCommitment": "2025-10-28T22:00:00.000Z",
        "subtaskCommitment": "2025-03-02T22:00:00.000Z",
        "parentDaysTillCommitment": 1,
        "subtaskDaysTillCommitment": 4,
        "subtaskHoursLeft": -13.5,
        "parentHoursLeft": -14.5,
        "parentSpentSec": 165600,
        "parentEstimateSec": 113400,
        "subtaskSpentSec": 91800,
        "subtaskEstimateSec": 43200
    },
    {
        "subtask": "P2S2",
        "parent": "P2",
        "developer": "Beaker",
        "parentSummary": "Parent Description 2",
        "substaskSummary": "Subtask Name 2.2",
        "parentCommitment": "2025-10-28T22:00:00.000Z",
        "subtaskCommitment": "2025-03-02T22:00:00.000Z",
        "parentDaysTillCommitment": 1,
        "subtaskDaysTillCommitment": 4,
        "subtaskHoursLeft": -1,
        "parentHoursLeft": -11.5,
        "parentSpentSec": 190800,
        "parentEstimateSec": 149400,
        "subtaskSpentSec": 14400,
        "subtaskEstimateSec": 10800
    },
    {
        "subtask": "P3S1",
        "parent": "P3",
        "developer": "Rowlf",
        "parentSummary": "Parent Description 3",
        "substaskSummary": "Subtask Name 3.1",
        "parentCommitment": "2025-03-02T22:00:00.000Z",
        "subtaskCommitment": "2025-03-02T22:00:00.000Z",
        "parentDaysTillCommitment": 4,
        "subtaskDaysTillCommitment": 4,
        "subtaskHoursLeft": 4,
        "parentHoursLeft": 30.5,
        "parentSpentSec": 14400,
        "parentEstimateSec": 124200,
        "subtaskSpentSec": 0,
        "subtaskEstimateSec": 14400
    },
    {
        "subtask": "P4S1",
        "parent": "P4",
        "developer": "Gonzo",
        "parentSummary": "Parent Description 4",
        "substaskSummary": "Subtask Name 4.1",
        "parentCommitment": "2025-03-01T22:00:00.000Z",
        "subtaskCommitment": "2025-10-28T22:00:00.000Z",
        "parentDaysTillCommitment": 3,
        "subtaskDaysTillCommitment": 1,
        "subtaskHoursLeft": -10,
        "parentHoursLeft": 11.5,
        "parentSpentSec": 118800,
        "parentEstimateSec": 160200,
        "subtaskSpentSec": 64800,
        "subtaskEstimateSec": 28800
    },
    {
        "subtask": "P5S1",
        "parent": "P5",
        "developer": "Dr. Bunsen",
        "parentSummary": "Parent Description 5",
        "substaskSummary": "Subtask Name 5.1",
        "parentCommitment": "2025-10-29T22:00:00.000Z",
        "subtaskCommitment": "2025-10-28T22:00:00.000Z",
        "parentDaysTillCommitment": 2,
        "subtaskDaysTillCommitment": 1,
        "subtaskHoursLeft": 6,
        "parentHoursLeft": 34.25,
        "parentSpentSec": 229500,
        "parentEstimateSec": 352800,
        "subtaskSpentSec": 7200,
        "subtaskEstimateSec": 28800
    }
];

var taskStatus = {
    "SUCCEEDED" : "bar",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
};

var yKeys = tasks.map(function(a) {return a.subtask;});

var gantt = d3.gantt().workDayOfSprint(9).taskTypes(yKeys);
gantt(tasks);


function updateData(){
    d3.selectAll("svg").remove();
    gantt = d3.gantt().workDayOfSprint(9).taskTypes(yKeys);
    gantt(tasks);
    return false;
}