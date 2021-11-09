import algoliasearch from 'algoliasearch';
import { Auth } from 'aws-amplify'
import { useSelector } from 'react-redux';

type ApiEndpoint = {
    name: string,
    endpoint: string,
    region: string
}

type CognitoConfigs = {
    mandatorySignIn: boolean
    region: string
    userPoolId: string
    identityPoolId: string
    userPoolWebClientId: string
}

export default {
    Auth: {
        mandatorySignIn: true,
        region: 'eu-west-1',
        userPoolId: 'eu-west-1_vkN1VDPay',
        identityPoolId: 'eu-west-1:196c4c44-13a4-4203-a101-760aa5cf929d',
        userPoolWebClientId: '7b6rlm0b5cr6bght73crjjnrp9'
    },
    API: {
        endpoints: [{
            name: 'api',
            endpoint: 'https://ugyy4hs6ck.execute-api.eu-west-1.amazonaws.com/dev',
            region: 'eu-west-1'
        }]
    }
}

export const searchClient = algoliasearch('0QIMGTJKAH', '408cc6b59ee1172b459becbe3f2deffd');
export const indexName = "dev_haul"
