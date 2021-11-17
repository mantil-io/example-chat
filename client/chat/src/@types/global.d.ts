interface MantilEnv {
    endpoints: MantilEnvEndpoints
}

interface MantilEnvEndpoints {
    rest: string
    ws: string
}

declare var mantilEnv: MantilEnv
