// src/commandes/commandes.service.ts
import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from '../entities/commande.entity';
import { StatutTable } from '../entities/table.entity';
import { ClientsService } from '../clients/clients.service';
import { TablesService } from '../tables/tables.service';
import { PlatsService } from '../plats/plats.service';

@Injectable()
export class CommandesService {
  constructor(
    @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,
    @Inject(forwardRef(() => ClientsService))
    private readonly clientsService: ClientsService,
    @Inject(forwardRef(() => TablesService))
    private readonly tablesService: TablesService,
    @Inject(forwardRef(() => PlatsService))
    private readonly platsService: PlatsService,
  ) {}

  findAll(): Promise<Commande[]> {
    return this.commandeRepository.find({
      relations: ['client', 'table', 'plat'],
    });
  }

  async findOne(id: number): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({
      where: { id },
      relations: ['client', 'table', 'plat'],
    });
    if (!commande) throw new NotFoundException(`Commande #${id} non trouvée`);
    return commande;
  }

  async create(
    tableId: number,
    clientId: number,
    platId: number,
    prixTotal?: number,
  ): Promise<Commande> {
    // Vérifier que le client existe
    await this.clientsService.findOne(clientId);

    // Vérifier que la table existe
    await this.tablesService.findOne(tableId);

    // Vérifier que le plat existe et récupérer son prix
    const plat = await this.platsService.findOne(platId);

    // Utiliser le prix du plat si prixTotal n'est pas fourni
    const prix = prixTotal || Number(plat.prix);

    const nouvelleCommande = this.commandeRepository.create({
      tableId,
      clientId,
      platId,
      prixTotal: prix,
    });
    const saved = await this.commandeRepository.save(nouvelleCommande);

    // Mettre à jour le statut de la table à "occupée"
    await this.tablesService.update(tableId, undefined, StatutTable.OCCUPEE);

    return this.findOne(saved.id);
  }

  async update(
    id: number,
    tableId?: number,
    clientId?: number,
    platId?: number,
    prixTotal?: number,
  ): Promise<Commande> {
    const commande = await this.findOne(id);

    if (clientId !== undefined) {
      await this.clientsService.findOne(clientId);
      commande.clientId = clientId;
    }

    if (tableId !== undefined) {
      await this.tablesService.findOne(tableId);
      commande.tableId = tableId;
    }

    if (platId !== undefined) {
      const plat = await this.platsService.findOne(platId);
      commande.platId = platId;
      // Mettre à jour le prix total si un nouveau plat est sélectionné
      if (prixTotal === undefined) {
        commande.prixTotal = Number(plat.prix);
      }
    }

    if (prixTotal !== undefined) {
      commande.prixTotal = prixTotal;
    }

    await this.commandeRepository.save(commande);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const commande = await this.findOne(id);

    // Libérer la table si c'est la dernière commande
    const autresCommandes = await this.commandeRepository.find({
      where: { tableId: commande.tableId },
    });
    if (autresCommandes.length === 1) {
      await this.tablesService.update(commande.tableId, undefined, StatutTable.LIBRE);
    }

    await this.commandeRepository.remove(commande);
  }
}
