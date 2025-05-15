import { ArtworkEntity } from '../artwork/artwork.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class ImageEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    source: string;

    @Column()
    altText: string;

    @Column()
    height: number;

    @Column()   
    width: number;

    @ManyToOne(() => ArtworkEntity, artwork => artwork.images)
    artwork: ArtworkEntity;
    


}
