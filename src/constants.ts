export const cwd = () => process.cwd()

export const regExpTemplate = /<%= *(.*?) *%>|(?:<% *([a-z]+) *\((.*?)\) *{ *%>([\s\S]*?)<% *} *%>)/g

export const regExpFilePlaceholders = /__(.*?)__/g

export const strings = {
  upper: (input: string) => input.toUpperCase(),
  classify: (input: string) => input.split(/[- _]/g).map(part => `${part[0].toUpperCase()}${part.slice(1)}`).join(''),
  camelize: (input: string) => input.split(/[- _]/g).map((part, i) => i === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`).join(''),
  dasherize: (input: string) => input.replace(/[ A-Z]/g, (match => match === ' ' ? '-' : `-${match.toLowerCase()}`)),
  noop: (input: any) => input
} as const