import { ArtworkEntity } from '../artwork/artwork.entity';
import { MovementEntity } from '../movement/movement.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
@Entity()
export class ArtistEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    birthdate: Date;

    @Column()
    birthplace: string;

    @Column()
    image: string;

    @OneToMany(() =>ArtworkEntity, artwork => artwork.artist)
    artworks: ArtworkEntity[];

    @ManyToMany(() => MovementEntity, movement => movement.artists)
    movements: MovementEntity[];




}
