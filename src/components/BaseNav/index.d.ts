/**
 * 菜单项的数据结构
 */
interface Menu {
  id: string;
  label: string;
  url: string;
  child: Menu[];
}
