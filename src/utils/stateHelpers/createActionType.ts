function createActionType<T extends string>(type: T): T
function createActionType<N extends string, A extends string>(
  namespace: N,
  action: A
): `${N}/${A}`
function createActionType<As extends string[]>(...args: As): string
function createActionType(...args: string[]) {
  return args.join('/')
}

export default createActionType
