// src/commandes/commandes.service.ts
import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { StatutTable } from '../tables/table.types';
import { ClientsService } from '../clients/clients.service';
import { TablesService } from '../tables/tables.service';
import { PlatsService } from '../plats/plats.service';

// Interface pour typer nos commandes
interface Commande {
  id: number;
  tableId: number;
  clientId: number;
  platId: number;
  prixTotal: number;
}

@Injectable()
export class CommandesService {
  constructor(
    @Inject(forwardRef(() => ClientsService))
    private readonly clientsService: ClientsService,
    @Inject(forwardRef(() => TablesService))
    private readonly tablesService: TablesService,
    @Inject(forwardRef(() => PlatsService))
    private readonly platsService: PlatsService,
  ) {}

  // Données en mémoire
  private commandes: Commande[] = [
    {
      id: 1,
      tableId: 2,
      clientId: 1,
      platId: 1,
      prixTotal: 12.5,
    },
  ];
  private nextId = 2;

  findAll(): Commande[] {
    return this.commandes;
  }

  findOne(id: number): Commande {
    const commande = this.commandes.find((c) => c.id === id);
    if (!commande) throw new NotFoundException(`Commande #${id} non trouvée`);
    return commande;
  }

  create(
    tableId: number,
    clientId: number,
    platId: number,
    prixTotal?: number,
  ): Commande {
    // Vérifier que le client existe
    this.clientsService.findOne(clientId);

    // Vérifier que la table existe
    this.tablesService.findOne(tableId);

    // Vérifier que le plat existe et récupérer son prix
    const plat = this.platsService.findOne(platId);

    // Utiliser le prix du plat si prixTotal n'est pas fourni
    const prix = prixTotal || Number(plat.prix);

    const nouvelleCommande: Commande = {
      id: this.nextId++,
      tableId,
      clientId,
      platId,
      prixTotal: prix,
    };
    this.commandes.push(nouvelleCommande);

    // Mettre à jour le statut de la table à "occupée"
    this.tablesService.update(tableId, undefined, StatutTable.OCCUPEE);

    return nouvelleCommande;
  }

  update(
    id: number,
    tableId?: number,
    clientId?: number,
    platId?: number,
    prixTotal?: number,
  ): Commande {
    const commande = this.findOne(id);

    if (clientId !== undefined) {
      this.clientsService.findOne(clientId);
      commande.clientId = clientId;
    }

    if (tableId !== undefined) {
      this.tablesService.findOne(tableId);
      commande.tableId = tableId;
    }

    if (platId !== undefined) {
      const plat = this.platsService.findOne(platId);
      commande.platId = platId;
      // Mettre à jour le prix total si un nouveau plat est sélectionné
      if (prixTotal === undefined) {
        commande.prixTotal = Number(plat.prix);
      }
    }

    if (prixTotal !== undefined) {
      commande.prixTotal = prixTotal;
    }

    return commande;
  }

  remove(id: number): void {
    const commande = this.findOne(id);

    // Libérer la table si c'est la dernière commande pour cette table
    const autresCommandes = this.commandes.filter(
      (c) => c.tableId === commande.tableId && c.id !== id,
    );
    if (autresCommandes.length === 0) {
      this.tablesService.update(commande.tableId, undefined, StatutTable.LIBRE);
    }

    const index = this.commandes.findIndex((c) => c.id === id);
    this.commandes.splice(index, 1);
  }
}
