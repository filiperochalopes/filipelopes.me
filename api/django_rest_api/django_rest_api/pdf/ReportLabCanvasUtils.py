from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase.ttfonts import TTFont
from PyPDF2 import PdfWriter, PdfReader, PdfFileWriter
from math import ceil
import io
import re
import datetime
from inspect import getfullargspec
import base64
from django_rest_api.settings import FONT_DIRECTORY, BOLD_FONT_DIRECTORY


class ReportLabCanvasUtils():

    def __init__(self) -> None:
        self.default_language = 'pt'
        self.packet_1 = io.BytesIO()
        # Create canvas and add data
        self.can_1 = canvas.Canvas(self.packet_1, pagesize=(595, 841))
        self.canvas_dict = {
            'can_1': [self.can_1, self.packet_1]
        }
        # Change canvas font to mach with the document
        # this is also changed in the document to some especific fields
        pdfmetrics.registerFont(TTFont('Lato-Bold', BOLD_FONT_DIRECTORY))
        pdfmetrics.registerFont(TTFont('Lora-Regular', FONT_DIRECTORY))
        self.can = self.canvas_dict['can_1'][0]
        self.current_pag_number = 1
        self.skill_reached_y_page_limit = False
        self.experience_reached_y_page_limit = False
    

    def add_paragraph(self, pos:tuple, text:str, leading:int, widht:int, height:int=100) -> None:
        my_Style = ParagraphStyle('My Paragraph style',
            fontName=self.current_font['name'],
            backColor='#00FFFFFF',
            fontSize=self.current_font['size'],
            borderColor='#00FFFFFF',
            borderWidth=0,
            borderPadding=(0,0,0),
            leading=leading,
            alignment=0
        )
        
        p1 = Paragraph(text, my_Style)
        p1.wrapOn(self.can,widht,height)
        p1.drawOn(self.can,pos[0],pos[1])
        return None
    
    def get_output(self) -> PdfWriter:
        try:
            # save the current canvas
            self.canvas_dict[f'can_{self.current_pag_number}'][0] = self.can

            new_pdfs = []
            new_pages = []
            pdf_writer = PdfFileWriter()
            for value in self.canvas_dict.values():
                value[0].save()
                value[1].seek(0)
                # Create pdf object and new blank page
                new_pdfs.append(PdfReader(value[1]))
                new_pages.append(pdf_writer.addBlankPage(width=595, height=841))

            output = PdfWriter()
            # add the "watermark" (which is the new pdf) on the existing page
            for position in range(0, len(new_pages)):
                new_pages[position].mergePage(new_pdfs[position].pages[0])
                output.add_page(new_pages[position])

            return output
        except Exception as e:
            raise Exception(str(e))
    

    def validate_func_args(self, function_to_verify, variables_to_verify:dict, nullable_variables:list=[]) -> None:
        """validate all args with the type needed or default values

        Args:
            function_to_verify: function to verify, like function_to_verify
            variables_to_verify (dict): dict with variable name and variable valuea
            nullable_variables (list): list with variables that can be null

        Returns:
            None
        """  
        try:
        #get args types and defaults types form function
            args_types = getfullargspec(function_to_verify)[6]
            defaults_types = getfullargspec(function_to_verify)[3]
            if defaults_types == None:
                defaults_types = (None, None)
            
            defaults_types = [type(x) for x in defaults_types]
            #Verify every key
            for variables_keys in args_types.keys():
                if variables_keys == 'return':
                    continue

                right_type = args_types[variables_keys]
                arg_to_validate = type(variables_to_verify[variables_keys])
                
                if right_type == arg_to_validate:
                    continue
                elif arg_to_validate in defaults_types and variables_keys in nullable_variables:
                    continue
                else:
                    raise Exception(f'{variables_keys} estao com o tipo errado, deve ser {right_type}')
            return None
        except Exception as error:
            raise error
        except KeyError:
            raise Exception(f'KeyError, Alguma chave em {function_to_verify} esta faltando, enquanto validava os tipos, a chaves necessarias sao {args_types.keys()}')
        except:
            raise Exception(f'{arg_to_validate} tipo {right_type} erro desconhecido enquanto validava os argumentos {variables_keys} na funcao {function_to_verify}')


    def change_canvas(self, change_to_next_page:bool=True, change_to_canvas_number:int=0) -> None:
        """Change to second canvas to write new data"""
        if change_to_canvas_number != 0:
            new_page_number = change_to_canvas_number
            self.canvas_dict[f'can_{self.current_pag_number}'][0] = self.can
            self.can = self.canvas_dict[f'can_{new_page_number}'][0]
            self.current_pag_number = new_page_number
            return None
        
        if change_to_next_page:
            new_page_number = self.current_pag_number + 1
            
            if len(self.canvas_dict.keys()) == self.current_pag_number:
                # Needs to create a new canvas
                self.new_packet = io.BytesIO()
                self.new_canvas = canvas.Canvas(self.new_packet, pagesize=(595, 841))
                self.canvas_dict[f'can_{new_page_number}'] = [self.new_canvas, self.new_packet]
            self.canvas_dict[f'can_{self.current_pag_number}'][0] = self.can
            self.can = self.canvas_dict[f'can_{new_page_number}'][0]
            self.current_pag_number = new_page_number
            return None

        new_page_number = self.current_pag_number - 1
        self.canvas_dict[f'can_{self.current_pag_number}'][0] = self.can
        self.can = self.canvas_dict[f'can_{new_page_number}'][0]
        self.current_pag_number = new_page_number
        return None


    def set_font(self, fontname:str, size:int) -> None:
        """Change canvas font

        Args:
            fontname (str): font name
            size (int): size 
        """
        self.can.setFont(fontname, size)
        self.current_font = {
            'name': fontname,
            'size': size
        }
        return None


    def add_data(self, data:str, pos:tuple) -> None:
        """Add data in pdf using canvas object

        Args:
            data (str): data to be added
            pos (tuple): data insert position in points

        Returns:
            None
            
        """
        try:
            self.can.drawString(pos[0], pos[1], data)
            return None
        except:
            raise Exception("Erro desconhecido enquanto adicionava um dado no documento com o canvas")


    def add_square(self, pos:tuple, size:tuple=(9, 9)) -> None:
        """Add square in document using canvas object

        Args:
            
            pos (tuple): position to add the square
            size (tuple, optional): square size default is the size of the option quare. Defaults to 9.

        Returns:
            None
            
        """
        try:
            self.can.rect(x=pos[0], y=pos[1], width=size[0], height=size[1], fill=1)
            return None
        except:
            raise Exception("Erro desconhecido enquanto adicionava um quadrado (opcoes de marcar) no documento com o canvas")


    def add_rectangle(self, pos:tuple, width:int, height:int, color:tuple=(.9215, .9215, .9215), alpha:float=1.0,stroke:int=0, fill:int=1) -> None:
        """Add the rectangle in document

        Args:
            pos (tuple): position (x, y)
            width (int): rectangle width
            height (int): rectangle height
            color (tuple): rectangle fill color, use rgb (r, g, b) with 0 to 1 scale, you do this tranformation dividing by 255. Example: 234/255 -> .91
            alpha (float): alpha value in color, use 0 to 1. Defaults to 1. 
            stroke (int): stroke intensity, start with 0. Defaults to 0. 
            fill (int): fill all rectangle with color, 0 - False or 1 - True. Defaults to 1. 
        """
        try:
            self.validate_func_args(function_to_verify=self.add_rectangle, variables_to_verify={'pos':pos,'width':width,'height':height,'color':color,'alpha':alpha,'stroke':stroke,'fill':fill,})
            #Change fill color do draw rect
            try:
                r = float(color[0])
                g = float(color[1])
                b = float(color[2])
            except:
                raise Exception("Voce precisa adiconar a cor do retangulo no formato (r, g, b)")
            self.can.setFillColorRGB(r=r, g=g, b=b, alpha=float(alpha))
            self.can.rect(pos[0], pos[1], width=width, height=height, stroke=stroke, fill=fill)
            #Change fill color to black again to write text
            self.can.setFillColorRGB(0, 0, 0, 1)
            return None
        except Exception as error:
            raise error
        except:
            raise Exception('Erro desconhecido enquanto adicionava um rentangulo no documento')

    def add_centralized_data(self, data:str, pos:tuple) -> None:
        """Add centralized_data in pdf using canvas object

        Args:
            can (canvas.Canvas): canvas that will be used to add centralized_data
            data (str): centralized_data to be added
            pos (tuple): centralized_data insert position in points

        Returns:
            None
            
        """
        try:
            self.can.drawCentredString(pos[0], pos[1], data)
            return None
        except:
            raise Exception("Erro desconhecido enquanto adicionava um dado centralizado no documento com o canvas")


    def add_right_data(self, data:str, pos:tuple) -> None:
        """Add right string in pdf using canvas object

        Args:
            can (canvas.Canvas): canvas that will be used to add right data
            data (str): right_data to be added
            pos (tuple): right_data insert position in points

        Returns:
            None
            
        """
        try:
            self.can.drawRightString(pos[0], pos[1], data)
            return None
        except:
            raise Exception("Erro desconhecido enquanto adicionava um dado alinhado a direita no documento com o canvas")

    def write_newpdf(self) -> None:
        """Write new pdf in a file

        Args:
            newpdf (PdfFileWriter): new pdf with all the changes made by canvas
            new_directory (str): directory to save the new pdf
        Returns:
            None
            
        """ 
        try:
            output = self.get_output()
            output_file = open(self.WRITE_DIRECTORY, 'wb')
            output.write(output_file)
            output_file.close()
        except Exception as error:
            raise error
        except:
            raise Exception("Erro desconhecido enquanto criava um novo arquivo pdf")


    def get_base64(self) -> bytes:
        """Write new pdf and return a base64

        Args:
            newpdf (PdfFileWriter): new pdf with all the changes made by canvas
        Returns:
            bytes
            
        """ 
        try:
            # Create a BytesIO object to use as file
            output = self.get_output()
            bytes_stream = io.BytesIO()
            output.write(bytes_stream)
            return base64.b64encode(bytes_stream.getvalue())
        except Exception as error:
            raise error
        except:
            raise Exception("Erro desconhecido enquanto criava um novo arquivo pdf em base64")


    def add_oneline_text(self, text:str, pos:tuple, field_name:str, len_max:int, nullable:bool=False, len_min:int=0, interval:str='', centralized:bool=False, right_align:bool=False) -> None:
        """Add text that is fill in one line

        Args:
            text (str): text value
            pos (tuple): position in canvas
            field_name (str): Camp name, this is used when return Responses
            len_max (int): maximum text lenght
            nullable (bool, optional): Data can me None. Defaults to False.
            len_min (int, optional): Minimum text lenght. Defaults to 0.
            interval (str): interval to add between every char
            centralized (bool, optional): Data has to be centralized. Defaults to False.
            right_align (bool, optional): Data has to be right align. Defaults to False.
        Returns:
            None
        """
        try:
            if nullable:
                if text == None or len(str(text).strip()) == 0:
                    return None

            self.validate_func_args(function_to_verify=self.add_oneline_text, variables_to_verify={'text':text, 'pos':pos, 'field_name':field_name, 'len_max':len_max, 'nullable':nullable, 'len_min':len_min, 'interval':interval, 'centralized':centralized, 'right_align':right_align})
            if not nullable:
                text = text.strip()
                if len(text) == 0:
                    raise Exception(f"{field_name} nao pode ser vazio")
            # verify if text is in the need lenght
            text = text.strip()
            if len_min <= len(text) <= len_max:
                text = self.add_interval_to_data(data=text, interval=interval)
                if centralized:
                    self.add_centralized_data(data=text, pos=pos)
                elif right_align: 
                    self.add_right_data(data=text, pos=pos)
                else:
                    self.add_data(data=text, pos=pos)
                return None
            else:
                raise Exception(f"Nao foi possivel adicionar {field_name} porque e maior que {len_max} characteres ou menor que {len_min} caracteres")
        
        except Exception as error:
            raise error
        except:
            raise Exception(f'Erro desconhecido enquando adicionava {field_name}')


    def add_abbreviated_name(self, name:str, pos:tuple, field_name:str, len_max:int, len_min:int=0, centralized:bool=False, nullable:bool=False, uppered:bool=False):
        """Abbreviate a name and add to canvas

        Args:
            name (str): name to be abbrebiated
            pos (tuple): position in canvas
            field_name (str): Camp name, this is used when return Responses
            len_max (int): maximum text lenght
            len_min (int, optional): Minimum text lenght. Defaults to 0.
            nullable (bool, optional): Data can me None. Defaults to False.
            centralized (bool, optional): Data has to be centralized. Defaults to False.
            uppered (bool, optional): Upper all text, example JOAO DA SILVA. Defaults to False.
        """    
        try:    
            if nullable:
                if name == None or len(str(name).strip()) == 0:
                    return None

            self.validate_func_args(function_to_verify=self.add_abbreviated_name, variables_to_verify={'name':name, 'pos':pos, 'field_name':field_name, 'len_max':len_max, 'nullable':nullable, 'len_min':len_min,'centralized':centralized, 'uppered':uppered})

            abbrevitated_name = self.get_abbrevitate_name(name=name).strip()

            if len(abbrevitated_name) > len_max:
                raise Exception('O nome abreviado ficou maior que o espaço disponível, lembre-se que o sistema abrevia somente os nomes do meio, ou seja, o primeiro e o ultimo nome nao sao abreviados. Voce pode abrevialos manualmente.')

            if uppered:
                abbrevitated_name = abbrevitated_name.upper()
    
            self.add_oneline_text(text=abbrevitated_name, pos=pos, field_name=field_name, len_max=len_max, len_min=len_min, centralized=centralized, nullable=nullable)

            return None

        except Exception as error:
            raise error
        except:
            raise Exception(f'Erro desconhecido enquando adicionava {field_name}')


    def add_morelines_text(self, text:str, initial_pos:tuple, decrease_ypos:int, field_name:str, len_max:int, char_per_lines:int, paragraph_widht:int,max_lines_amount:int=None, nullable:bool=False, len_min:int=0, interval:str='', paragraph_height:int=100) -> int:
        """Add text that is fill in one line

        Args:
            text (str): text value
            initial_pos (tuple): initial position in canvas
            decrease_ypos (int): decrease y value to break lines
            field_name (str): Camp name, this is used when return Responses
            len_max (int): maximum text lenght
            char_per_lines (int): char amount for every lines
            max_lines_amount (int, optional): maximum lines amount . Defaults to None.
            nullable (bool, optional): Data can me None. Defaults to False.
            len_min (int, optional): Minimum text lenght. Defaults to 0.
            interval (str): interval to add between every char
        Returns:
            y last position
        """    
        try:
            if nullable:
                if text == None or len(str(text).strip()) == 0:
                    return None
            self.validate_func_args(function_to_verify=self.add_morelines_text, variables_to_verify={'text':text, 'initial_pos':initial_pos, 'decrease_ypos':decrease_ypos, 'field_name':field_name, 'len_max':len_max, 'char_per_lines':char_per_lines, 'max_lines_amount':max_lines_amount, 'nullable':nullable, 'len_min':len_min, 'interval':interval, 'paragraph_widht':paragraph_widht, 'paragraph_height':paragraph_height}, nullable_variables=['max_lines_amount'])


            if not nullable:
                text = text.strip()
                if len(text) == 0:
                    raise Exception(f'{field_name} nao pode ser vazio')
            # verify if text is in the need lenght
            text = text.strip()
            # Turns white to wrte a invisible paragraph to get metrics need
            self.can.setFillColorRGB(1, 1, 1, 1)
            if len_min <= len(text) <= len_max:
                text = self.add_interval_to_data(data=text, interval=interval)
                str_to_line = ''
                broke_lines_times = int(len(text)/char_per_lines)
                if max_lines_amount != None and broke_lines_times + 1 > max_lines_amount:
                    raise Exception(f'Nao foi possivel adicionar {field_name} pois a quantidade de linhas necessarias e maior que {max_lines_amount}')
                current_line = char_per_lines
                last_line = 0
                xpos = initial_pos[0]
                ypos = initial_pos[1]
                # Making the line break whem has max charater limiti reached in a line
                total_lines = broke_lines_times + 1

                while broke_lines_times >= 0:
                    str_to_line = text[last_line:current_line]
                    self.add_data(data=str_to_line, pos=(xpos, ypos))
                    last_line = current_line
                    current_line += char_per_lines
                    broke_lines_times -= 1
                    ypos -= decrease_ypos

                # Turn black again to write text
                self.can.setFillColorRGB(0, 0, 0, 1)
                self.add_paragraph(text=text, pos=(initial_pos[0], ypos+decrease_ypos), leading=decrease_ypos, widht=paragraph_widht, height=paragraph_height)
                return ypos
            else:
                raise Exception(f"Nao foi possivel adicionar {field_name} porque e maior que {len_max} characteres ou menor que {len_min} caracteres")

        except Exception as error:
            raise error
        except:
            raise Exception(f'Erro desconhecido enquando adicionava {field_name}')
        

    def add_interval_to_data(self, data:str, interval:str) -> str:
        """add interval to data

        Args:
            data (str): data
            interval (str): interval to add betwaeen every char

        Returns:
            interval(str): data with the intervals add
            
        """    
        if type(data) != type(str()):
            return Exception('O sistema deve enviar o dado para a funcao add_interval sendo do tipo string, contate o administrador do sistema')
        elif type(interval) != type(str()):
            return Exception('O sistema deve enviar o intervalo a ser adicionado no dado para a funcao add_interval sendo do tipo string, contate o administrador do sistema')
        # Add nterval between data
        return interval.join(data)


    def change_education_canvas(self, title) -> int:
        self.change_canvas(change_to_next_page=True)
        y_pos = 780
        self.set_font('Lora-Regular', 12)
        self.add_oneline_text(text=title, pos=(30, y_pos), field_name='titulo educacao next page', len_max=100, interval=' ')
        self.add_rectangle(pos=(190, y_pos+10), width=1, height=-780, fill=1, color=(0,0,0,0))
        y_pos -= 20
        return y_pos


    def add_education(self, courses, y_pos:int, page_y_limit:int) -> None:
        try:
            education_titles = {
                'pt': 'EDUCACAO',
                'en': 'EDUCATION',
            }

            self.set_font('Lora-Regular', 12)
            self.add_oneline_text(text=education_titles[self.default_language], pos=(30, y_pos), field_name='titulo educacao', len_max=100, interval=' ')
            y_pos -= 25
            for course in courses:
                course_info = {
                    'pt': {
                        'name': course.name_pt_br,
                        'place': course.place_pt_br,
                        'present': 'Atual',
                    },
                    'en': {
                        'name': course.name_en_us,
                        'place': course.place_en_us,
                        'present': 'Present',
                    }
                }
                if y_pos <= page_y_limit:
                    y_pos = self.change_education_canvas(title=education_titles[self.default_language])
                self.set_font('Lato-Bold', 10)
                y_pos = self.add_morelines_text(text=str(course_info[self.default_language].get('name')).upper(), initial_pos=(30, y_pos), char_per_lines=25, max_lines_amount=3, len_max=60, decrease_ypos=10, field_name=f'Nome do curso {course.id}', paragraph_widht=150)
                
                self.set_font('Lora-Regular', 10)
                y_pos -= 5
                y_pos = self.add_morelines_text(text=str(course_info[self.default_language].get('place')), initial_pos=(30, y_pos), char_per_lines=28, max_lines_amount=3, len_max=100, decrease_ypos=10, field_name=f'Nome da instituicao {course.id}', paragraph_widht=150)

                y_pos -= 5
                until = str(course.until.year) if course.until is not None else course_info[self.default_language].get('present')
                self.add_oneline_text(text=f'{str(course.since.year)} - {until}', pos=(30, y_pos), len_max=20, field_name=f'Inicio do curso {course.id}')
                y_pos -= 30
            self.add_rectangle(pos=(30, y_pos), width=140, height=1, fill=1, color=(0,0,0,0))
            return y_pos, self.current_pag_number
        except Exception as error:
            raise error
        except:
            raise Exception('Erro desconhecido enquando adicionava cursos')


    def change_skill_canvas(self, title) -> int:
        self.skill_reached_y_page_limit = True
        self.change_canvas(change_to_next_page=True)
        y_pos = 780
        self.set_font('Lora-Regular', 12)
        self.add_oneline_text(text=title, pos=(30, y_pos), field_name='titulo habilidades proxima pagina', len_max=100, interval=' ')
        self.add_rectangle(pos=(190, y_pos+10), width=1, height=-780, fill=1, color=(0,0,0,0))
        y_pos -= 20
        return y_pos


    def add_skills(self, skills, y_pos:int, education_pag_number:int, page_y_limit:int) -> None:
        try:
            self.set_font('Lora-Regular', 12)
            skill_titles = {
                'pt': 'HABILIDADES',
                'en': 'SKILLS',
            }

            #raise Exception(self.current_pag_number)
            self.change_canvas(change_to_canvas_number=education_pag_number, change_to_next_page=False)
            
            # Change to same canvas that experience
            self.set_font('Lora-Regular', 12)
            if y_pos <= page_y_limit:
                y_pos = self.change_skill_canvas(title=skill_titles[self.default_language])
            else:
                self.add_oneline_text(text=skill_titles[self.default_language], pos=(30, y_pos), field_name='titulo habilidades', len_max=100, interval=' ')
                y_pos -= 20
            
            sub_skills_list = [skill for skill in skills if skill.parent_id is not None]

            for skill in skills:
                if skill is None or skill.parent_id is not None:
                    continue
                skill_info = {
                    'pt': {
                        'title': 'HABILIDADES',
                        'name': skill.name_pt_br,
                    },
                    'en': {
                        'title': 'SKILLS',
                        'name': skill.name_en_us,
                    }
                }
                if y_pos <= page_y_limit:
                    y_pos = self.change_skill_canvas(title=skill_info[self.default_language].get('title'))
                
                self.set_font('Lora-Regular', 10)
                y_pos = self.add_morelines_text(text=str(skill_info[self.default_language].get('name')), initial_pos=(30, y_pos), len_max=50, field_name=f'Habilidade {skill.id}', decrease_ypos=10, nullable=True, char_per_lines=28, paragraph_widht=150)
                self.add_skills_square(skill=skill, pos=(30, y_pos))

                current_sub_skills = [sub_skill for sub_skill in sub_skills_list if sub_skill.parent_id == skill.id]
                if len(current_sub_skills) > 0:
                    y_pos = self.add_sub_skills(current_sub_skills=current_sub_skills, page_y_limit=page_y_limit, y_pos=y_pos, new_title=skill_info[self.default_language].get('title')) 
                    
                
                y_pos -= 10
            if y_pos < 30 and not self.skill_reached_y_page_limit:
                self.skill_reached_y_page_limit = True
                y_pos = 780

            return y_pos
        except Exception as error:
            raise error
        except:
            raise Exception('Erro desconhecido enquando adicionava habilidade')


    def add_skills_square(self, skill, pos:tuple):
        x_pos = pos[0]
        # get the complete blocks quantity
        complete_blocks = ceil(skill.level / 5)
        for x in range(complete_blocks):
            self.add_square(pos=(x_pos, pos[1]), size=(3, 3))
            x_pos += 6
        return None


    def add_sub_skills(self, current_sub_skills, page_y_limit:int, new_title:str, y_pos:int):
        self.set_font('Lora-Regular', 9)
        for sub_skill in current_sub_skills:
            sub_skill_info = {
                'pt': {
                    'name': sub_skill.name_pt_br,
                },
                'en': {
                    'name': sub_skill.name_en_us,
                }
            }
            y_pos -= 12
            if y_pos <= page_y_limit:
                y_pos = self.change_skill_canvas(title=new_title)
            y_pos = self.add_morelines_text(text=str(sub_skill_info[self.default_language].get('name')), initial_pos=(37, y_pos), len_max=50, field_name=f'Sub habilidade {sub_skill.id}', decrease_ypos=10, nullable=True, char_per_lines=28, paragraph_widht=143)
            self.add_skills_square(skill=sub_skill, pos=(37, y_pos))

        # Change font to default    
        self.set_font('Lora-Regular', 10)
        return y_pos


    def change_work_experience_canvas(self, title):
        self.change_canvas(change_to_next_page=True)
        y_pos = 780
        self.set_font('Lora-Regular', 12)
        self.add_oneline_text(text=title, pos=(217, y_pos), field_name='titulo experiencia pagina 2', len_max=100, interval=' ')
        y_pos -= 20
        return y_pos


    def add_work_experience(self, experiences, y_pos:int, page_y_limit:int) -> None:
        try:
            experience_titles = {
                'pt': 'EXPERIÊNCIA PROFISSIONAL',
                'en': 'WORK EXPERIENCE',
            }
            
            self.change_canvas(change_to_canvas_number=1, change_to_next_page=False)
            if y_pos <= page_y_limit:
                y_pos = self.change_work_experience_canvas(title=experience_titles[self.default_language])
            self.set_font('Lora-Regular', 12)
            self.add_oneline_text(text=experience_titles[self.default_language], pos=(217, y_pos), field_name='titulo experiencia', len_max=100, interval=' ')
            y_pos -= 25

            for exp in experiences:
                exp_info = {
                    'pt': {
                        'title': exp.title_pt_br,
                        'description': exp.description_pt_br,
                        'achivements': exp.key_achievement_pt_br,
                        'present': 'Atual',
                    },
                    'en': {
                        'title': exp.title_en_us,
                        'description': exp.description_en_us,
                        'achivements': exp.key_achievement_en_us,
                        'present': 'Present',
                    }
                }
                if y_pos <= page_y_limit:
                    y_pos = self.change_work_experience_canvas(title=experience_titles[self.default_language])
                self.set_font('Lato-Bold', 10)
                y_pos = self.add_morelines_text(text=str(exp_info[self.default_language].get('title')).upper(), initial_pos=(217, y_pos), char_per_lines=62, max_lines_amount=3, len_max=500, decrease_ypos=10, field_name=f'Cargo de Trabalho {exp.id}', paragraph_widht=347)
                self.set_font('Lora-Regular', 9)
                until = str(exp.until.year) if exp.until is not None else exp_info[self.default_language].get('present')
                start_end = f'{str(exp.since.year)} - {until}'
                y_pos -= 5
                if y_pos <= page_y_limit:
                    y_pos = self.change_work_experience_canvas(title=experience_titles[self.default_language])
                self.set_font('Lora-Regular', 10)
                y_pos = self.add_morelines_text(text=f'{str(exp.organization)} / {start_end}', initial_pos=(217, y_pos), char_per_lines=70, max_lines_amount=3, len_max=500, decrease_ypos=10, field_name=f'Nome da empresa {exp.id} e periodo de trabalho',paragraph_widht=347)

                if y_pos <= page_y_limit:
                    y_pos = self.change_work_experience_canvas(title=experience_titles[self.default_language])
                    self.set_font('Lora-Regular', 10)
                y_pos -= 5
                y_pos = self.add_morelines_text(text=str(exp_info[self.default_language].get('achivements')), initial_pos=(217, y_pos), char_per_lines=70, max_lines_amount=3, len_max=500, decrease_ypos=10, field_name=f'Descricao do trabalho {exp.id}', paragraph_widht=347)

                y_pos -= 5
                for achievement in str(exp_info[self.default_language].get('description')).split('-'):
                    achievement = achievement.replace('\n', '').strip()
                    if len(achievement) == 0:
                        continue
                    achievement = '•&nbsp&nbsp&nbsp ' + achievement
                    if y_pos <= page_y_limit:
                        y_pos = self.change_work_experience_canvas(title=experience_titles[self.default_language])
                        self.set_font('Lora-Regular', 10)
                    y_pos = self.add_morelines_text(text=achievement, initial_pos=(237, y_pos), char_per_lines=62, max_lines_amount=10, len_max=700, decrease_ypos=10, field_name=f'Conquistas no trabalho {exp.id}', nullable=True, paragraph_widht=327)
                    y_pos -= 3
                    
                y_pos -= 20
                if y_pos < 30:
                    y_pos = self.change_work_experience_canvas(title=experience_titles[self.default_language])
            
            return y_pos, self.current_pag_number   
        except Exception as error:
            raise error
        except:
            raise Exception('Erro desconhecido enquando adicionava experiencia profissional')


    def change_certificate_canvas(self, title) -> int:
        self.change_canvas(change_to_next_page=True)
        y_pos = 780
        self.set_font('Lora-Regular', 12)
        self.add_oneline_text(text=title, pos=(217, y_pos), field_name='titulo certificados', len_max=100, interval=' ')
        y_pos -= 20
        return y_pos


    def add_certificates(self, certificates, y_pos, work_page_number:int, page_y_limit:int):
        try:
            self.change_canvas(change_to_next_page=False, change_to_canvas_number=work_page_number)

            self.set_font('Lora-Regular', 12)
            certificates_titles = {
                'pt': 'CERTIFICADOS',
                'en': 'CERTIFICATES',
            }

            if y_pos <= page_y_limit:
                y_pos = self.change_certificate_canvas(title=certificates_titles.get(self.default_language))
            else:
                self.add_oneline_text(text=certificates_titles.get(self.default_language), pos=(217, y_pos), field_name='titulo certificados', len_max=100, interval=' ')
                y_pos -= 20
            
            for certif in certificates:
                certif_info = {
                    'pt': {
                        'title': certif.title_pt_br,
                    },
                    'en': {
                        'title': certif.title_en_us,
                    }
                }
                if y_pos <= page_y_limit:
                    y_pos = self.change_certificate_canvas(title=certificates_titles.get(self.default_language))
                self.set_font('Lato-Bold', 9)
                y_pos = self.add_morelines_text(text=str(certif_info[self.default_language].get('title')).upper(), initial_pos=(217, y_pos), char_per_lines=62, max_lines_amount=3, len_max=500, decrease_ypos=10, field_name=f'Titulo do certificado {certif.id}', paragraph_widht=347)
                
                self.set_font('Lora-Regular', 10)
                y_pos -= 5
                y_pos = self.add_morelines_text(text=f'{certif.date.year}', initial_pos=(217, y_pos), char_per_lines=70, max_lines_amount=3, len_max=500, decrease_ypos=10, field_name=f'Ano do certificado {certif.id}', paragraph_widht=347)
                y_pos -= 10
            
            return y_pos
        except Exception as error:
            raise error
        except:
            raise Exception('Erro desconhecido enquando adicionava certificatos')


    def add_datetime(self, date:str, pos:tuple, field_name:str, hours:bool=True, nullable:bool=False, formated:bool=True, interval:str='', interval_between_numbers:str='', centralized:bool=False) -> None:
        """Add datetime to canvas

        Args:
            
            date (str): date to use
            pos (tuple): position
            field_name (str): camp name
            hours (bool): add hours. Defaults to True
            nullable (bool, optional): can be null. Defaults to False.
            formated (bool, optional): format (add '/' and ':'). Defaults to True.
            interval (str, optional): add interval between  day, month, year, hour, min, sec. Defaults to ''.
            interval_between_numbers (str, optional): add interval between  every number. Defaults to ''.
            centralized (bool, optional): centralize the date in document
        Returns:
            None
            
        """    
        try:
            if nullable:
                if date == None:
                    return None
            
            self.validate_func_args(function_to_verify=self.add_datetime, variables_to_verify={'date':date, 'pos':pos, 'field_name':field_name, 'hours':hours, 'nullable':nullable, 'formated':formated, 'interval':interval, 'interval_between_numbers':interval_between_numbers, 'centralized':centralized})


            #Add to respective fields
            try:
                #Create a datetimeobject just to makesure the date is valid
                if hours:
                    date_object = datetime.datetime.strptime(date, '%d/%m/%Y %H:%M')
                else:
                    date_object = datetime.datetime.strptime(date, '%d/%m/%Y')
            except:
                if hours:
                    raise Exception(f'{field_name}- A data nao corresponde ao formato dd/mm/yyyy HH:MM')
                raise Exception(f'{field_name}- A data nao corresponde ao formato dd/mm/yyyy')
            str_date = str('%02d/%02d/%d %02d:%02d') % (date_object.day, date_object.month, date_object.year, date_object.hour, date_object.minute)
            if hours:  
                if not formated:
                    str_date = self.add_interval_to_data(data=str_date, interval=interval_between_numbers)
                    str_date = str_date.replace('/', interval)
                    str_date = str_date.replace(':', interval)
            else:
                str_date = str_date[0:10]
                if not formated:
                    str_date = str_date.replace('/', interval)
                str_date = self.add_interval_to_data(data=str_date, interval=interval_between_numbers)
            #self.add_data(data=str_date, pos=pos)
            self.add_oneline_text(text=str_date, pos=pos, field_name=field_name, len_max=50, centralized=centralized)
            return None

        except Exception as error:
            raise error
        except:
            raise Exception(f'Erro desconhecido enquando adicionava {field_name}')


    def get_abbrevitate_name(self, name:str) -> str:
        """abbreviate name. By default the function abbreviate the first and last name complete, and mid names are replaced with the first char
        Examples: Joao Marcos da Silva -> Joao M. D. Silva

        Args:
            name (str): name to abbreviate
        """        
        
        # Create a list with the name
        list_name = name.split()
        abbrevitated_name = str(list_name.pop(0)).title() + ' '
    
        # Abreviate all names, except the first (removed with pop) and the last
        for i in range(0, len(list_name)-1):
            current_name = list_name[i]
            
            # adds the capital first character
            abbrevitated_name += str(current_name[0].upper()) + '. '
        
        abbrevitated_name += str(list_name[-1]).title()

        return abbrevitated_name

