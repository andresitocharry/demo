
import { MuseumEntity } from '../museum/museum.entity';
import { SponsorEntity } from '../sponsor/sponsor.entity';
import { ArtworkEntity} from '../artwork/artwork.entity';
import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, OneToMany, OneToOne, JoinColumn} from 'typeorm';
@Entity()
export class ExhibitionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    @Column()
    description: string;

    @ManyToOne(() => MuseumEntity, museum => museum.exhibitions)
    museum: MuseumEntity;

    @OneToMany(() => ArtworkEntity, artwork => artwork.exhibition)
    artworks: ArtworkEntity[];

    @OneToOne(() => SponsorEntity, sponsor => sponsor.exhibition)
    @JoinColumn()
    sponsor: SponsorEntity;






}
