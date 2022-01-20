export default function concatRegExp(...regex) {
  return new RegExp(regex.map(re => re.source).join(''));
}
