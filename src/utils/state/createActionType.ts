function createActionType<T extends string>(type: T): T
function createActionType<C extends string, T extends string>(conceptName: C, type: T): `${C}/${T}`
function createActionType<As extends string[]>(...args: As): string
function createActionType(...args: string[]) {
  return args.join('/')
}

export default createActionType
