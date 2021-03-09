export default class Button {
  nama!: string;
  action!: string;
  type!: string;
  size!: string;
  loading!: boolean;
  constructor (
    nama: string,
    type: string = 'primary',
    size: string = 'large',
    action: string = '',
    loading: boolean = false
  ) {
    this.nama = nama;
    this.type = type;
    this.size = size;
    this.action = action;
    this.loading = loading;
  }
}
