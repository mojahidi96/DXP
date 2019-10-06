import {Inject, Injectable} from "@angular/core";
import {ClientConfig, LUMEN_CLIENT_CONFIG, LumenService, TranslationsService} from "@lumen/client-angular";
import {FeatureLinerFlow} from "./feature-linear-flow";

@Injectable()
export class CustomLumenService {

  constructor(
    @Inject(LUMEN_CLIENT_CONFIG) config: ClientConfig,
    private translationsService: TranslationsService,
    private lumenService: LumenService) {
  }

  public async createFeatureLinerPilot(feature: string, refId?: string): Promise<FeatureLinerFlow> {
    const rootResource = this.lumenService.getRootResource(refId);

    await this.lumenService.loadTranslations(rootResource);

    return new FeatureLinerFlow(rootResource, this.lumenService.getHeaders(), feature, this.translationsService.translations);
  }
}
