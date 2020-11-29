export const ipv4 = String.matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
  message: 'Invalid IP address',
  excludeEmptyString: true
}).test('ip', 'Invalid IP address', value => {
  return value === undefined || value.trim() === ''
    ? true
    : value.split('.').find(i => parseInt(i, 10) > 255) === undefined
})
