export type Listener<T = any> = (...args: T[]) => void

type EmitterEvents<Events extends string> = 'error' | Events

export class Emitter<Events extends string> {
  private events: Partial<Record<EmitterEvents<Events>, Array<[Listener, args: any[]]>>>

  constructor() {
    this.events = {} as any
  }

  on<T = any, A = any>(event: EmitterEvents<Events>, listener: Listener<T>, ...args: A[]) {
    const { events } = this

    if (typeof listener !== 'function')
      throw new TypeError(listener + ' is not a function')
    if (events[event] === undefined) {
      events[event] = [[listener, args]]
    } else if (
      events[event]?.every(([fn]) =>
         fn !== listener
      )
    ) {
      events[event]?.push([listener, args])
    }

    return this
  }

  off(event: EmitterEvents<Events>, listener: Listener) {
    const { events } = this

    if (events[event]) {
      events[event] = events[event]?.filter(([fn]) => fn !== listener)
    }

    return this
  }

  emit(event: EmitterEvents<Events>, ...payload: any[]) {
    const { events } = this

    if (events[event]) {
      events[event]?.forEach(([listener, args = []]) => {
        try {
          listener.apply(this, [...payload, ...args])
        } catch (error: any) {
          if (events.error && events.error.length > 0) {
            events.error.forEach(([listener]) => listener.apply(this, [error]))
          } else {
            throw error
          }
        }
      })
      return true
    } else {
      return false
    }
  }
}