import  { readStringBlock } from '../shared/importer';

export function aoc16 (searchForInvalidsOnly = false): number {
    // list:
    // [0]:   [['departure', [[0, 3], [5,7]]]]
    // [1]:   [[1,2,3,4,5]]
    // [2]:   [[1,2,3,4,5], [2,3,4,5,6]]
    const list: any[][] = readStringBlock('./assets/aoc16.txt').map(prepareInput);

    if (searchForInvalidsOnly) {
        return findInvalidTickets(list[0], list[2]).reduce((a, b) => a + b);
    }

    const departureIndices: number[] = getDepartureIndices(list[0], filterTickets(list[0], list[2]));

    // return all departure entries of own ticket
    return list[1][0]
                .filter((elem: number, idx: number) => departureIndices.indexOf(idx) >= 0)
                .reduce((a: number, b: number) => a * b);
}

function getDepartureIndices(allRules: any[], ticketList: any[]): number[] {
    // start with all rules per ticket field
    const ruleOptions = new Array(ticketList[0].length).fill(null).map(elem => allRules);

    // remove all rules per field that do not match with scanned tickets
    ticketList.forEach(ticketValues => {
        ticketValues.forEach((ticketVal: any, idx: number) => {
            ruleOptions[idx] = ruleOptions[idx]
                                    .map((rule: any[]|null) => (rule && isValid(ticketVal, rule)) ? rule : null)
                                    .filter(a => a);
        });
    });

    // reduce remaining rules by sorting out 'fixed' rules (only one rule per index)
    return reduce(ruleOptions)
        // and search for all rules that start with 'departure'
        .map((ruleList: any[], idx: number) => (ruleList[0][0].indexOf('departure') === 0) ? idx : -1)
        .filter(a => a !== -1);
}

function reduce(ruleOptions: any[], filtered: any[]= []): any[] {
    const foundRuleList = ruleOptions.find((ruleList: any[]) => {
        const elem = ruleList.filter(a => a);

        if (elem.length === 1 && filtered.indexOf(elem[0]) < 0) {
            filtered.push(elem[0]);
            return true;
        }

        return false;
    });

    if (foundRuleList) {
        return reduce(ruleOptions.map(ruleList => (ruleList.length <= 1) ? ruleList : ruleList.filter((a: any[]) => (a && a[0] !== foundRuleList[0][0]))),
                      filtered);
    }

    return ruleOptions;
}

function filterTickets(ruleList: any[], ticketList: any[]): any[] {
    return ticketList.filter(ticketValues => {
        return ticketValues.filter(getInvalidTicketFilter(ruleList)).length === 0;
    });
}

function findInvalidTickets(ruleList: any[], ticketList: any[]): number[] {
    return ticketList.map(ticketValues => ticketValues.filter(getInvalidTicketFilter(ruleList))[0])
                .filter(a => a);
}

function getInvalidTicketFilter(ruleList: any[]): (a:number) => boolean {
    return function isInvalidTicket(ticketVal: number) {
        let invalid = true;

        // rule: ['departure', [[0, 3], [5,7]]]
        ruleList.forEach((rule: any[]) => {
            if (isValid(ticketVal, rule)) {
                invalid = false;
            }
        });

        return invalid;
    };
}

function prepareInput(block: string, idx: number): any[] {
    const blockLines = block.split(/\r?\n/);

    return (idx === 0) ? blockLines.map(parseRule): blockLines.slice(1).map(l => l.split(',').map(Number));
}

function parseRule(rule: string): any[] {
    const parts = rule.split(':');

    return [parts[0].trim(), parts[1].split(' or ').map(part => part.split('-').map(Number))];
}

// rule ['departure', [[0, 3], [5,7]]]
function isValid(ticketVal: number, rule: any[]) {
    return (ticketVal >= rule[1][0][0] && ticketVal <= rule[1][0][1]) ||
           (ticketVal >= rule[1][1][0] && ticketVal <= rule[1][1][1]);
}
