import { authToken } from '../store/stores.js';
import { get as getStore } from 'svelte/store';
import { navigate } from 'svelte-routing';
import { getAllDateProperties } from '../util/util.js';

export const baseurl = 'http://localhost:9000/api';

const UNAUTHORIZED = 401;
const BAD_REQUEST = 400;

export async function post(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(transformRequest(body)),
        headers: {
            'Content-Type': 'application/jsonp',
            'Authorization': getStore(authToken)
        }
    });
    return validityCheck(response);
}

export async function get(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/jsonp',
            'Authorization': getStore(authToken)
        }
    });
    return validityCheck(response);
}

async function validityCheck(response) {
    switch (response.status) {
        case 401:
            authToken.reset();
            navigate('/login');
            return null;
        case 400:
            //TODO
            break;
        default:
            const json = await response.json();
            return transformResponse(json);
    }
}

//request + response transformations
function transformRequest(inputObject) {
    if (Array.isArray(inputObject)) {
        let output = [];
        inputObject.forEach(obj => {
            output.push(transformRequestObject(obj));
        });
        return output;
    } else {
        return transformRequestObject(inputObject);
    }
}

function transformResponse(inputObject) {
    if (Array.isArray(inputObject)) {
        let output = [];
        inputObject.forEach(obj => {
            output.push(transformResponseObject(obj));
        });
        return output;
    } else {
        return transformResponseObject(inputObject);
    }
}

function transformRequestObject(inputObject) {
    let output = {};

    Object.getOwnPropertyNames(inputObject).forEach((name, _, __) => {
        const prop = inputObject[name];

        switch (prop.constructor) {
            case Date:
                output[name] = +prop;
                break;

            default:
                output[name] = prop;
                break;
        }
    });

    return output;
}

function transformResponseObject(inputObject) {
    let output = {};

    Object.getOwnPropertyNames(inputObject).forEach((name, _, __) => {
        const prop = inputObject[name];

        if (getAllDateProperties().includes(name)) {
            output[name] = new Date(prop);
        } else {
            output[name] = prop;
        }
    });

    return output;
}