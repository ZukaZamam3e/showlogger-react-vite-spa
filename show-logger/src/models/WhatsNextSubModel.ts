export interface WhatsNextSubModel {
  whatsNextSubId: number;
  tvInfoId: number;
  showName: string;
  subscribeDate?: Date;
  includeSpecials: boolean;
  lastDataRefresh?: Date;
  posterUrl?: string;
  backdropUrl?: string;
  infoUrl?: string;
  status?: string;

  api?: number;
  type?: number;
  id?: string;
}

export const createNewWhatsNextSub = () => {
  const newWhatsNextSub: WhatsNextSubModel = {
    whatsNextSubId: -1,
    tvInfoId: -1,
    showName: '',
    subscribeDate: undefined,
    includeSpecials: false,
  };

  return newWhatsNextSub;
};
