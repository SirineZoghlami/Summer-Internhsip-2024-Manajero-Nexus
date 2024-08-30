import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TutorialService } from './tutorial.service';
import { Tutorial } from '../../models/nexus-models/tutorial.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('TutorialService', () => {
  let service: TutorialService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8085/ManajeroBackend/api/tutorials';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TutorialService]
    });
    service = TestBed.inject(TutorialService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  describe('TutorialService', () => {
    let service: TutorialService;
    let httpMock: HttpTestingController;
    const apiUrl = 'http://localhost:8085/ManajeroBackend/api/tutorials';
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TutorialService]
      });
      service = TestBed.inject(TutorialService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should create a tutorial', () => {
      const mockTutorial: Tutorial = { /* mock tutorial data */ } as Tutorial;
      const formData = new FormData();
  
      service.createTutorial(formData).subscribe(tutorial => {
        expect(tutorial).toEqual(mockTutorial);
      });
  
      const req = httpMock.expectOne('http://localhost:8085/ManajeroBackend/api/tutorials/create');
      expect(req.request.method).toBe('POST');
      req.flush(mockTutorial);
    });
  
    it('should upload an image', () => {
      const tutorialId = '1';
      const imageType = 'cover';
      const formData = new FormData();
      const mockResponse = 'Image uploaded successfully';
  
      service.uploadImage(tutorialId, imageType, formData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne(`${apiUrl}/${tutorialId}/uploadImage/${imageType}`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  
    it('should fetch all tutorials', () => {
      const mockTutorials: Tutorial[] = [{ /* mock tutorial data */ }] as Tutorial[];
  
      service.getTutorials().subscribe(tutorials => {
        expect(tutorials).toEqual(mockTutorials);
      });
  
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockTutorials);
    });
  
    it('should fetch the last created tutorial', () => {
      const mockTutorials: Tutorial[] = [{ /* mock tutorial data */ }] as Tutorial[];
      const lastTutorial = mockTutorials[mockTutorials.length - 1];
  
      service.getLastCreatedTutorial().subscribe(tutorial => {
        expect(tutorial).toEqual(lastTutorial);
      });
  
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockTutorials);
    });
  
    it('should update a tutorial', () => {
      const mockTutorial: Tutorial = { /* mock tutorial data */ } as Tutorial;
      const tutorialId = '1';
      const formData = new FormData();
  
      service.updateTutorial(tutorialId, formData).subscribe(tutorial => {
        expect(tutorial).toEqual(mockTutorial);
      });
  
      const req = httpMock.expectOne(`${apiUrl}/${tutorialId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockTutorial);
    });
  
    it('should delete a tutorial', () => {
      const tutorialId = '1';
  
      service.deleteTutorial(tutorialId).subscribe(response => {
        expect(response).toBeUndefined();
      });
  
      const req = httpMock.expectOne(`${apiUrl}/${tutorialId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  
    it('should fetch a tutorial by id', () => {
      const mockTutorial: Tutorial = { /* mock tutorial data */ } as Tutorial;
      const tutorialId = '1';
  
      service.getTutorialById(tutorialId).subscribe(tutorial => {
        expect(tutorial).toEqual(mockTutorial);
      });
  
      const req = httpMock.expectOne(`${apiUrl}/${tutorialId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTutorial);
    });
  
    it('should handle error', () => {
      const errorMessage = 'Something bad happened; please try again later.';
      const mockError = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });
  
      service.getTutorials().subscribe({
        next: () => fail('expected an error, not tutorials'),
        error: error => {
          expect(error.message).toContain(errorMessage);
        }
      });
  
      const req = httpMock.expectOne(apiUrl);
      req.flush('test 404 error', { status: 404, statusText: 'Not Found' });
    });
  });
})


