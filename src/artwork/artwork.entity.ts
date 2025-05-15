import { ArtistEntity } from '../artist/artist.entity';
import { ExhibitionEntity } from '../exhibition/exhibition.entity';
import { ImageEntity } from '../image/image.entity';
import { MuseumEntity } from '../museum/museum.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
@Entity()
export class ArtworkEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    year: number;

    @Column()   
    description: string;

    @Column()
    type:string;

    @Column()
    mainImage: string;


    @ManyToOne(() => MuseumEntity, museum => museum.artworks)
    museum: MuseumEntity;


    @ManyToOne(()=>ExhibitionEntity,exhibition => exhibition.artworks)
    exhibition: ExhibitionEntity;

    @OneToMany(()=> ImageEntity, image => image.artwork)
    images: ImageEntity[];  


    @ManyToOne(() =>    ArtistEntity, artist => artist.artworks)
    artist: ArtistEntity;



}
