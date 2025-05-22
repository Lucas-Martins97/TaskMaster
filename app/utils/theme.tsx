export default class Theme {
  static getTextColor(theme: string) {
    return theme === 'dark' ? 'text-white' : 'text-black';
  }
  static getTitleColor(theme: string) {
    return theme === 'dark' ? 'text-brandPurple' : 'text-brandBlue';
  }
  static getBgColor(theme: string) {
    return theme === 'dark' ? 'bg-brandPurple' : 'bg-brandBlue';
  }
}
